import { NextRequest, NextResponse } from 'next/server';
import { SimulatorNode, SimulatorConnection, SimulationResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nodes: SimulatorNode[] = body.nodes || [];
    const connections: SimulatorConnection[] = body.connections || [];
    const incomingQps: number = Number(body.qps) || 50000;

    const bottlenecks: string[] = [];
    const spofWarnings: string[] = [];
    const recommendations: string[] = [];

    let totalCost = 0;
    let baseLatency = 0;

    // Check nodes
    nodes.forEach((node) => {
      totalCost += node.costPerMonth * (node.redundancy || 1);
      baseLatency += node.baseLatencyMs;

      // Check redundancy
      if (node.type !== 'client' && node.redundancy <= 1) {
        spofWarnings.push(
          `Single Point of Failure (SPOF): ${node.name} (${node.type}) has redundancy = 1. A node failure will take down all downstream traffic.`
        );
      }

      // Check capacity bottleneck
      const effectiveCapacity = node.capacityQPS * (node.redundancy || 1);
      if (incomingQps > effectiveCapacity) {
        bottlenecks.push(
          `Capacity Bottleneck: ${node.name} maximum throughput is ${effectiveCapacity.toLocaleString()} QPS, but simulated load is ${incomingQps.toLocaleString()} QPS (Exceeded by ${Math.round(((incomingQps - effectiveCapacity) / effectiveCapacity) * 100)}%).`
        );
      }
    });

    // Check specific architectural design patterns
    const hasCdn = nodes.some((n) => n.type === 'cdn');
    const hasCache = nodes.some((n) => n.type === 'cache');
    const hasQueue = nodes.some((n) => n.type === 'queue');
    const hasLoadBalancer = nodes.some((n) => n.type === 'load_balancer');
    const hasDb = nodes.some((n) => n.type === 'database');

    if (!hasCdn && incomingQps > 10000) {
      recommendations.push(
        'Introduce an Edge CDN (e.g. Cloudflare / CloudFront) to terminate TLS at the edge and absorb 60-80% of static/cached GET queries.'
      );
    }

    if (!hasCache && hasDb) {
      recommendations.push(
        'Database has no preceding Redis/Memcached cache layer. Read-heavy traffic will hammer DB IOPS directly.'
      );
    }

    if (!hasQueue && incomingQps > 40000) {
      recommendations.push(
        'High write QPS detected without an asynchronous message broker (Kafka/RabbitMQ). Bursts may lead to 504 Gateway Timeouts.'
      );
    }

    if (!hasLoadBalancer && nodes.length > 3) {
      recommendations.push(
        'Missing Layer 7 Load Balancer (ALB / Envoy) to distribute requests across microservice instances.'
      );
    }

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    if (bottlenecks.length > 0) {
      status = 'critical';
    } else if (spofWarnings.length > 0) {
      status = 'warning';
    }

    // Add latency penalty if bottlenecked
    const finalLatency = bottlenecks.length > 0 ? baseLatency * 3.5 : baseLatency;

    const result: SimulationResult = {
      totalQps: incomingQps,
      estimatedLatencyMs: Math.round(finalLatency * 10) / 10,
      estimatedCostPerMonth: totalCost,
      bottlenecks,
      spofWarnings,
      recommendations,
      status
    };

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to simulate architecture' },
      { status: 500 }
    );
  }
}

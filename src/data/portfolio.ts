export interface Project {
  slug: string;
  title: string;
  /** Short summary shown on the Home project card. */
  description: string;
  context: string;
  solution: string;
  stack: string[];
  impact: string[];
}

export const projects: Project[] = [
  {
    slug: 'predictive-capacity-planning',
    title: 'Predictive Capacity Planning System',
    description:
      "Forecasting pipeline (Facebook Prophet) that turns GMV targets and QPS history into per-service CPU specs for Tokopedia peak campaigns — zero capacity-related outages since adoption.",
    context:
      "Tokopedia's peak campaigns (e.g., Harbolnas, Ramadan sale) required infrastructure provisioning weeks in advance. Teams relied on manual, assumption-based estimates — often over-provisioning (wasted cost) or under-provisioning (outage risk).",
    solution:
      'Designed a forecasting pipeline using Facebook Prophet that ingests business GMV targets, models historical QPS traffic patterns, and outputs per-service machine CPU spec recommendations. The system accounts for seasonality, growth trends, and campaign multipliers to produce infrastructure plans aligned with actual demand.',
    stack: ['Go', 'Python', 'Prophet', 'ClickHouse', 'RocketMQ', 'ByteCloud APIs'],
    impact: [
      'Eliminated guesswork in capacity planning — all provisioning backed by data-driven forecasts',
      'Enabled cost-optimized scaling: right-sized infrastructure for each campaign window',
      'Zero capacity-related outages during peak campaigns post-adoption',
    ],
  },
  {
    slug: 'unified-service-metadata',
    title: 'Unified Service Metadata Platform',
    description:
      "Real-time service graph that consolidates 10+ systems into one source of truth for ownership, dependencies, and multi-VDC placement — 99% HA coverage for P0/P1 services.",
    context:
      "Tokopedia's service topology was scattered across 10+ disconnected systems — CMDB, monitoring tools, deployment pipelines, and resource inventories each held partial views. No single source of truth existed for what services ran where, their dependencies, or their criticality.",
    solution:
      'Architected a centralized platform that ingests metadata from TCE, Redis, RDS, and other infrastructure systems in real time, normalizing and correlating records into a unified service graph. The platform tracks ownership, dependencies, SLO compliance, and multi-VDC placement for every service.',
    stack: ['Go', 'ClickHouse', 'Redis', 'PostgreSQL', 'RocketMQ', 'ByteCloud APIs'],
    impact: [
      'Consolidated 10+ fragmented systems into one authoritative source',
      'Achieved 99% high-availability coverage and 100% multi-VDC resilience for P0/P1 services',
      'Enabled proactive risk assessment — teams could see blast radius and dependency chains before changes',
    ],
  },
  {
    slug: 'sdlc-analytics',
    title: 'SDLC Analytics Platform',
    description:
      "Near-real-time DORA metrics and quality indicators from CI/CD, version control, and incident tools, replacing manual weekly spreadsheets for engineering leadership.",
    context:
      'Engineering leadership lacked visibility into the software delivery lifecycle across business lines. Metrics like lead time, deployment frequency, and change failure rate were compiled manually in spreadsheets — slow, error-prone, and often stale by the time they reached decision-makers.',
    solution:
      'Built an analytics platform that instruments CI/CD pipelines, version control, and incident management tools to compute DORA metrics and quality indicators in near real-time. Dashboards surface trends by team, service, and business line, with drill-down into specific bottlenecks.',
    stack: ['Go', 'PostgreSQL', 'ClickHouse', 'RocketMQ', 'ByteCloud APIs'],
    impact: [
      'Eliminated manual reporting — metrics available live instead of weekly spreadsheets',
      'Leadership gained real-time quality insights, accelerating data-driven decisions',
      'Bottleneck visibility drove targeted process improvements across teams',
    ],
  },
  {
    slug: 'cloud-migration-automation',
    title: 'Cloud Migration Automation & Observability',
    description:
      "Tooling that validates migration prerequisites, orchestrates staged cutovers, and tracks service health live during Tokopedia's move to ByteCloud — 90% less manual effort.",
    context:
      "Tokopedia's migration to ByteCloud involved hundreds of online applications. Manual validation of migration readiness, infrastructure health checks, and cutover monitoring would have required an unsustainable amount of SRE toil.",
    solution:
      'Engineered automation tooling that validates pre-migration prerequisites (resource mappings, network policies, security groups), orchestrates staged cutovers, and provides real-time dashboards tracking migration progress, service health, and rollback readiness.',
    stack: [
      'Go',
      'PostgreSQL',
      'BigQuery',
      'NewRelic',
      'Prometheus',
      'GCP APIs',
      'AWS APIs',
      'ByteCloud APIs',
    ],
    impact: [
      'Reduced manual migration effort by 90%',
      'Real-time visibility into infrastructure health and cutover readiness',
      'Supported cross-functional teams through validation and post-migration monitoring',
    ],
  },
  {
    slug: 'ephemeral-port-monitoring',
    title: 'Ephemeral Port Monitoring',
    description:
      "Prometheus exporter and Grafana dashboards for Linux ephemeral port usage on proxy servers, catching port exhaustion before it breaks outbound connections.",
    context:
      "During Tokopedia's cloud migration to ByteCloud, some services experienced intermittent failures calling other services. Root cause analysis traced the issue to ephemeral port exhaustion on proxy servers — when all available ephemeral ports were consumed, new outbound connections failed, causing cascading service disruptions.",
    solution:
      'Initiated and led an ad-hoc project to build an Ephemeral Port Exporter that scrapes Linux kernel port usage metrics (/proc/net/tcp, /proc/net/udp) and exposes them as Prometheus metrics. Collaborated with the team to design dashboards in Grafana that track port utilization trends, connection states, and saturation thresholds, giving early warning before exhaustion occurs.',
    stack: ['Go', 'Prometheus', 'Grafana', 'Linux kernel (/proc/net)', 'ByteCloud'],
    impact: [
      'Proactive detection of port exhaustion before it caused service disruptions',
      'Eliminated repeated outages linked to ephemeral port depletion on transit proxies',
      'Improved overall system reliability during cloud migration with proper monitoring coverage',
    ],
  },
  {
    slug: 'cloud-cost-platform',
    title: 'Cloud Cost Platform (FinOps)',
    description:
      "Multi-cloud billing data in BigQuery, enriched with team and service metadata and surfaced in Looker Studio, with budget alerts and cost-anomaly detection.",
    context:
      "Tokopedia's multi-cloud (GCP, AWS, Alibaba Cloud) footprint made cost attribution difficult. Engineering teams had no visibility into their own infrastructure spend, and finance relied on monthly cloud provider invoices with minimal granularity.",
    solution:
      'Built a cost intelligence platform that ingests billing data from GCP and other providers into BigQuery, enriches it with organizational metadata (team, service, environment), and surfaces it through Looker Studio dashboards. Teams can drill into their spend by service, region, and resource type. Budget alerts and anomaly detection flag unexpected cost spikes.',
    stack: [
      'Go',
      'Redis',
      'BigQuery',
      'Apache Superset',
      'Google Looker Studio',
      'GCP APIs',
      'AWS APIs',
      'Alibaba Cloud APIs',
    ],
    impact: [
      'Unified cost reporting across cloud providers',
      'Enabled team-level budgeting and resource planning',
      'Anomaly detection caught cost spikes before they became billing surprises',
    ],
  },
  {
    slug: 'cloud-infrastructure-event-platform',
    title: 'Distributed Cloud Infrastructure Event Platform',
    description:
      "Event-driven platform (Pub/Sub + Go) that normalizes infrastructure changes across clouds into one audit trail and triggers compliance and tagging automation.",
    context:
      'Cloud infrastructure changes (instance provisioning, disk snapshots, network ACL updates) happened across multiple providers and regions, with no unified audit trail or automation trigger mechanism.',
    solution:
      'Designed an event-driven platform using GCP Pub/Sub and Go microservices that captures infrastructure lifecycle events from cloud provider APIs and webhooks, normalizes them into a common schema, and fans out to downstream automation workflows (compliance checks, cost tagging, inventory updates).',
    stack: ['Go', 'GCP Pub/Sub', 'BigQuery'],
    impact: [
      'Full audit trail of infrastructure changes across cloud providers',
      'Enabled automated compliance and tagging workflows triggered by real-time events',
      'Foundation for future self-healing and auto-remediation automation',
    ],
  },
  {
    slug: 'halalnode-containerization-cicd',
    title: 'Containerized Infrastructure & CI/CD (Halalnode)',
    description:
      "Replaced manual SSH deploys with Docker, GitLab CI/CD pipelines, and Ansible provisioning — 90% less manual effort — plus Prometheus/Grafana monitoring.",
    context:
      "Halalnode's deployments were manual — SSH into servers, pull code, restart services. No pipeline, no containerization, no repeatability.",
    solution:
      'Containerized all applications with Docker behind Nginx reverse proxies. Built GitLab CI/CD pipelines that run tests, build images, and deploy to staging/production. Automated server provisioning with Ansible, reducing setup time from hours to minutes.',
    stack: [
      'Docker',
      'Nginx',
      'GitLab CI',
      'Ansible',
      'Prometheus',
      'Grafana',
      'PostgreSQL',
      'MySQL',
      'DigitalOcean Cloud',
    ],
    impact: [
      'Deployment reliability: every release followed the same tested pipeline',
      'Reduced manual effort by 90% through Ansible automation',
      'Monitoring stack (Prometheus/Grafana)',
    ],
  },
];

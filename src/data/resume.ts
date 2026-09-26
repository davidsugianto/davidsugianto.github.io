export interface Experience {
  role: string;
  company: string;
  period: string;
  summary?: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export const experience: Experience[] = [
  {
    role: 'Platform Engineer',
    company: 'Cekat.AI',
    period: 'Aug 2026 – Present',
    summary: 'In progress — details coming soon.',
    highlights: [],
  },
  {
    role: 'Site Reliability Engineer',
    company: 'ByteDance',
    period: 'Mar 2025 – Jul 2026',
    summary:
      'Engineer site reliability solutions focusing on platform engineering to deliver predictive capacity planning, SDLC analytics, and unified service metadata. Implement large-scale cloud migration automation, ensuring high availability and multi-VDC resilience for critical services.',
    highlights: [
      'Designed and built a predictive capacity planning system using the Facebook Prophet framework to convert GMV/QPS forecasts into TCE infrastructure machine specs for Tokopedia peak campaigns, adopted by SRE teams since March 2026 across 8+ major promotional events (PayDay, Double Date, Ramadan), supporting up to $25.9M GMV per peak day and 58,000 cores while holding peak utilization to 20–45% and eliminating assumption-based provisioning.',
      'Built an SDLC analytics platform tracking 27 quality metrics across 36 engineering teams (segmented by Overall Tokopedia, C-End, and Developer Platform), eliminating manual reporting (5 engineers → 0) and enabling real-time quality insights for bug resolved rates of 94.44% (online) and 100% (P0) for leadership decision-making.',
      'Architected a unified service metadata platform consolidating 10+ systems into a single source of truth across 1,502 resources (761 TCE + 741 Non-TCE PSMs) and 22 teams, with real-time resource data ingestion (TCE/Redis/RDS) achieving 96.6% HA coverage and 100% multi-VDC resilience for P0/P1 services surfacing 50 HA and 20 cost-optimization recommendations for Tokopedia RD teams.',
      'Engineered automation and observability platforms for large-scale cloud migrations—reducing manual effort by 90%, cutting migration planning from 15 days to 1 hour for 200+ services, and providing real-time visibility into infrastructure health, migration progress, and cutover readiness for SRE teams.',
      'Onboarded 38 critical services to GEC observability standards (Success Rate, QPS, Latency) with 99.9% uptime monitoring, and delivered a GMV/P0 business-scenario monitoring dashboard covering 6 P0 scenarios with 50 monthly active users across SRE and engineering teams.',
      'Supported cross-functional migration of 50+ online applications to ByteCloud with zero critical incidents and <15 minutes downtime per service, validating readiness and monitoring post-migration health.',
      'Authored the SRE Observability Operation Handbook, cutting new SRE onboarding time by 40% and reducing incident escalations by 25%.',
    ],
  },
  {
    role: 'System Engineer',
    company: 'Tokopedia',
    period: 'Mar 2021 – Mar 2025',
    summary:
      'Engineered FinOps and infrastructure automation initiatives for a high-traffic e-commerce platform. Managed Infrastructure as Code (IaC), built distributed event systems, and maintained system reliability through rigorous incident response and continuous improvement processes.',
    highlights: [
      'Engineered a cloud cost platform integrated with Looker Studio and BigQuery for unified cost reporting, budgeting, and resource planning.',
      'Developed a centralized service inventory platform through providing full visibility into service configurations, dependencies, and infrastructure details information.',
      'Built a distributed event platform using Pub/Sub and Go to track cloud infrastructure lifecycle changes and drive automation workflows.',
      'Managed infrastructure as code with Terraform and Ansible, improving reproducibility, reducing provisioning time, and eliminating manual configuration drift.',
      'Independently handled on-call support and incident response, maintaining 99.9%+ system uptime across production infrastructure and platform services.',
      'Collaborated on post-mortems and RCA processes, driving continuous improvement in system reliability and MTTR.',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Halalnode',
    period: 'Jul 2019 – Feb 2021',
    summary:
      'Architected and maintained foundational cloud operations, focusing on containerization, CI/CD pipeline standardization, and infrastructure automation. Deployed comprehensive monitoring stacks to ensure real-time observability and system health.',
    highlights: [
      'Architected containerized infrastructure (Docker/Nginx) and engineered GitLab CI/CD pipelines, standardizing delivery and boosting deployment reliability.',
      'Automated infrastructure provisioning with Ansible, eliminating repetitive tasks and reducing manual effort by 90%.',
      'Deployed Prometheus/Grafana monitoring stacks for real-time system and application observability, accelerating incident response and improving uptime.',
      'Provisioned and maintained self-hosted PostgreSQL/MySQL databases via Docker, delivering secure, scalable data services for internal applications.',
    ],
  },
];

export const skills: SkillGroup[] = [
  { category: 'Cloud', items: ['AWS', 'GCP', 'Alibaba Cloud', 'ByteCloud', 'DigitalOcean'] },
  { category: 'IaC', items: ['Terraform', 'Ansible', 'Packer', 'Helm'] },
  { category: 'Containers', items: ['Kubernetes', 'Docker'] },
  { category: 'Observability', items: ['Prometheus', 'Grafana', 'ELK', 'NewRelic'] },
  { category: 'CI/CD', items: ['Jenkins', 'GitLab', 'ArgoCD', 'GitHub Actions'] },
  { category: 'Languages', items: ['Go', 'Python', 'Bash'] },
  { category: 'Data', items: ['BigQuery', 'ClickHouse', 'PostgreSQL', 'MySQL', 'Redis'] },
];

export const education: Education[] = [
  {
    degree: 'B.A.S. in Information Technology',
    school: 'State Polytechnic of Jember',
    period: '2015 – 2019',
  },
];

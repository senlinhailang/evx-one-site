import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLinkClickHandler,
  useLocation,
} from 'react-router-dom'
import {
  ArrowRightOutlined,
  AuditOutlined,
  CheckCircleFilled,
  CloudServerOutlined,
  CodeOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  GlobalOutlined,
  LaptopOutlined,
  LockOutlined,
  MailOutlined,
  MenuOutlined,
  MonitorOutlined,
  RadarChartOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SecurityScanOutlined,
  SendOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Form, Input, Layout, message, Select } from 'antd'

const { Header, Content, Footer } = Layout
const { TextArea } = Input

const services = [
  {
    icon: <CustomerServiceOutlined />,
    number: '01',
    title: 'IT Support',
    summary: 'Fast, human support that keeps your people productive and your systems running.',
    detail: 'Help desk, device management, Microsoft 365, cloud services, and proactive maintenance—all handled by one responsive partner.',
    tags: ['Help desk', 'Managed IT', 'Cloud support'],
  },
  {
    icon: <CloudServerOutlined />,
    number: '02',
    title: 'Network Deployments',
    summary: 'Reliable networks designed, deployed, and documented for the way your business works.',
    detail: 'From site surveys to secure Wi-Fi and multi-location rollouts, we build infrastructure ready for what comes next.',
    tags: ['Wi-Fi', 'Switching', 'Site rollouts'],
  },
  {
    icon: <SafetyCertificateOutlined />,
    number: '03',
    title: 'Cybersecurity',
    summary: 'Layered security that reduces risk without slowing your team down.',
    detail: 'We harden identities, endpoints, email, and networks with practical controls aligned to your actual risk.',
    tags: ['Endpoint security', 'MFA', 'Risk reduction'],
  },
  {
    icon: <RadarChartOutlined />,
    number: '04',
    title: 'Threat Monitoring',
    summary: 'Continuous visibility and rapid response when suspicious activity appears.',
    detail: 'We monitor signals across your environment, investigate alerts, and act quickly to contain real threats.',
    tags: ['24/7 monitoring', 'Alert triage', 'Response'],
  },
]

const values = [
  {
    icon: <EyeOutlined />,
    title: 'Clear by default',
    text: 'No black boxes or vague answers. You get plain-language guidance, useful documentation, and complete visibility.',
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Ready to respond',
    text: 'Technology issues move fast. So do we—with practical action, clear ownership, and calm communication.',
  },
  {
    icon: <SecurityScanOutlined />,
    title: 'Security in every layer',
    text: 'Protection is built into every recommendation, deployment, and support decision—not added as an afterthought.',
  },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function BrandMark() {
  return (
    <Link className="brand" to="/" aria-label="EVX One home">
      <img src="/evx-logo.png" alt="EVX One" />
    </Link>
  )
}

function RouterButton({ to, onClick, ...props }) {
  const handleLinkClick = useLinkClickHandler(to)

  const handleClick = (event) => {
    onClick?.(event)
    if (!event.defaultPrevented) handleLinkClick(event)
  }

  return <Button {...props} href={to} onClick={handleClick} />
}

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const navItems = [
    ['/', 'Home'],
    ['/services', 'Services'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]

  const nav = (
    <nav className="nav-links" aria-label="Primary navigation">
      {navItems.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setOpen(false)}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <Header className="site-header">
      <div className="nav-shell">
        <BrandMark />
        <div className="desktop-nav">{nav}</div>
        <RouterButton className="desktop-cta" type="primary" to="/contact">
          Let&apos;s talk <ArrowRightOutlined />
        </RouterButton>
        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined />}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        />
      </div>
      <Drawer
        className="mobile-drawer"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        title={<BrandMark />}
      >
        {nav}
        <RouterButton block type="primary" to="/contact" onClick={() => setOpen(false)}>
          Let&apos;s talk <ArrowRightOutlined />
        </RouterButton>
      </Drawer>
    </Header>
  )
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>
}

function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-top">
        <span className="service-icon">{service.icon}</span>
        <span className="service-number">{service.number}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link className="text-link" to="/services">
        Explore service <ArrowRightOutlined />
      </Link>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <h1>Your business,<br /><em>secured.</em></h1>
            <p>
              Responsive IT support, resilient networks, and always-on cybersecurity—built around your business.
            </p>
            <div className="hero-actions">
              <RouterButton type="primary" size="large" to="/contact">
                Strengthen your IT <ArrowRightOutlined />
              </RouterButton>
              <RouterButton className="ghost-button" size="large" to="/services">
                Explore services
              </RouterButton>
            </div>
            <div className="trust-row">
              <span><CheckCircleFilled /> Security-first</span>
              <span><CheckCircleFilled /> Rapid response</span>
              <span><CheckCircleFilled /> Human support</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE <span /></div>
      </section>

      <section className="trust-strip">
        <div className="page-shell trust-strip-inner">
          <span>ONE PARTNER. COMPLETE COVERAGE.</span>
          <div><LaptopOutlined /> ENDPOINTS</div>
          <div><GlobalOutlined /> NETWORKS</div>
          <div><LockOutlined /> SECURITY</div>
          <div><MonitorOutlined /> MONITORING</div>
        </div>
      </section>

      <section className="section services-preview">
        <div className="page-shell">
          <div className="split-heading">
            <SectionHeading
              eyebrow="What we do"
              title={<>Technology that works.<br /><span>Security that holds.</span></>}
            />
            <p>
              From everyday support to complex deployments and continuous protection, EVX One gives you the expertise to operate with confidence.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => <ServiceCard key={service.title} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section difference-section">
        <div className="page-shell difference-grid">
          <div className="difference-visual">
            <div className="console">
              <div className="console-head">
                <span>EVX ONE // LIVE OPERATIONS</span>
                <i><b /> <b /> <b /></i>
              </div>
              <div className="console-metrics">
                <div><small>SECURITY POSTURE</small><strong>98.7<sup>%</sup></strong><span>↑ 4.2% this month</span></div>
                <div className="pulse-chart">
                  <svg viewBox="0 0 260 80" role="img" aria-label="Stable security monitoring chart">
                    <path className="chart-fill" d="M0,60 L32,54 L58,58 L84,38 L104,46 L132,26 L160,40 L187,22 L210,31 L236,15 L260,19 L260,80 L0,80Z" />
                    <path className="chart-line" d="M0,60 L32,54 L58,58 L84,38 L104,46 L132,26 L160,40 L187,22 L210,31 L236,15 L260,19" />
                  </svg>
                </div>
              </div>
              <div className="console-events">
                <small>RECENT EVENTS</small>
                <div><CheckCircleFilled /><span>All endpoints compliant</span><time>NOW</time></div>
                <div><CheckCircleFilled /><span>Cloud backup verified</span><time>08:42</time></div>
                <div><CheckCircleFilled /><span>Security policy synced</span><time>07:18</time></div>
              </div>
            </div>
          </div>
          <div className="difference-copy">
            <SectionHeading
              eyebrow="The EVX difference"
              title={<>Proactive by design.<br /><span>Personal by nature.</span></>}
              text="Your technology partner should know your business, anticipate what’s next, and answer when it matters. That’s the standard we work to."
            />
            <div className="feature-list">
              <div><span><EyeOutlined /></span><p><b>See issues before they become problems</b>Continuous monitoring and proactive care keep small issues from becoming expensive disruptions.</p></div>
              <div><span><TeamOutlined /></span><p><b>Work with people who know your name</b>Direct access, accountable support, and advice grounded in your goals—not a ticket number.</p></div>
              <div><span><RocketOutlined /></span><p><b>Build for where you&apos;re going</b>Scalable systems and clear roadmaps support growth without constant rework.</p></div>
            </div>
            <RouterButton className="outline-button" size="large" to="/about">Why EVX One <ArrowRightOutlined /></RouterButton>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={<>IT built to perform.<br /><span>Security built to last.</span></>}
        text="A complete technology and security partner for organizations that need responsive support, reliable infrastructure, and confidence in every connection."
      />
      <section className="section">
        <div className="page-shell">
          <div className="service-detail-list">
            {services.map((service) => (
              <article className="service-detail" key={service.title}>
                <div className="detail-heading">
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-number">{service.number}</span>
                  <h2>{service.title}</h2>
                </div>
                <div className="detail-copy">
                  <p>{service.detail}</p>
                  <div className="tag-row">
                    {service.tags.map((tag) => <span key={tag}><CheckCircleFilled /> {tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="How we work"
            title={<>Simple process.<br /><span>Serious results.</span></>}
            text="Clear communication and disciplined execution at every step."
            align="center"
          />
          <div className="process-grid">
            {[
              ['01', <AuditOutlined />, 'Assess', 'We learn your environment, priorities, and risks.'],
              ['02', <CodeOutlined />, 'Design', 'We build a practical plan around your business.'],
              ['03', <SettingOutlined />, 'Deploy', 'We implement cleanly, securely, and with minimal disruption.'],
              ['04', <RadarChartOutlined />, 'Protect', 'We monitor, maintain, and continuously improve.'],
            ].map(([number, icon, title, text]) => (
              <div className="process-card" key={title}>
                <small>{number}</small><span>{icon}</span><h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="hero-grid" />
      <div className="page-shell page-hero-inner">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <div className="page-hero-code" aria-hidden="true">
          <span>EVX_ONE</span>
          <strong>01</strong>
          <i>SECURE // RELIABLE // READY</i>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EVX One"
        title={<>Technology expertise.<br /><span>Human commitment.</span></>}
        text="EVX One was built on a simple idea: businesses deserve an IT partner who is as invested in their success as they are."
      />
      <section className="section story-section">
        <div className="page-shell story-grid">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={<>A better standard<br /><span>for IT partnership.</span></>}
            />
          </div>
          <div className="story-copy">
            <p className="lead">Technology should create momentum—not uncertainty.</p>
            <p>
              EVX One helps growing organizations make technology simpler, safer, and more dependable. We combine hands-on support with security-minded strategy, so clients can focus on their business knowing their systems are in capable hands.
            </p>
            <p>
              We stay intentionally close to our clients. That means direct communication, thoughtful recommendations, and work we’re proud to put our name on.
            </p>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What guides us"
            title={<>Built on trust.<br /><span>Driven by outcomes.</span></>}
            align="center"
          />
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title}>
                <span>{value.icon}</span><h3>{value.title}</h3><p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section team-section">
        <div className="page-shell">
          <div className="split-heading team-heading">
            <SectionHeading
              eyebrow="Meet the team"
              title={<>The person behind<br /><span>the protection.</span></>}
            />
            <p>Expertise matters. So does having a trusted person who picks up the phone, owns the outcome, and sees the job through.</p>
          </div>
          <div className="team-card">
            <div className="portrait-placeholder">
              <img src="/founder.png" alt="Founder of EVX One" />
              <div className="portrait-grid" />
              <span className="portrait-label">EVX // 001</span>
            </div>
            <div className="team-copy">
              <Eyebrow>Founder &amp; lead consultant</Eyebrow>
              <h2>Your dedicated<br />technology partner.</h2>
              <p>
                EVX One is founder-led, giving every client direct access to the expertise and accountability behind the business. From strategic planning to hands-on troubleshooting, you’ll always know who is responsible for keeping your technology moving forward.
              </p>
              <div className="expertise">
                <span><CheckCircleFilled /> IT infrastructure</span>
                <span><CheckCircleFilled /> Network engineering</span>
                <span><CheckCircleFilled /> Cybersecurity</span>
                <span><CheckCircleFilled /> Client strategy</span>
              </div>
              <RouterButton className="outline-button" to="/contact">Start a conversation <ArrowRightOutlined /></RouterButton>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}

function ContactPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = () => {
    messageApi.success('Thanks — your message is ready to send. Connect this form to your preferred inbox to make it live.')
  }

  return (
    <>
      {contextHolder}
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s make your IT<br /><span>one less thing to worry about.</span></>}
        text="Tell us what’s happening, what you’re planning, or where you need a second opinion. We’ll start with a straightforward conversation."
      />
      <section className="section contact-section">
        <div className="page-shell contact-grid">
          <div className="contact-details">
            <SectionHeading
              eyebrow="Start a conversation"
              title={<>Talk to someone<br /><span>who understands.</span></>}
              text="Whether you need immediate support or are planning what comes next, we’re ready to listen."
            />
            <div className="contact-founder">
              <img src="/founder.png" alt="EVX One founder" />
              <div className="contact-founder-caption">
                <span>FOUNDER-LED SUPPORT</span>
                <strong>Direct access. Clear answers.</strong>
              </div>
            </div>
            <div className="contact-methods">
              <a href="mailto:info@evx.one"><span><MailOutlined /></span><div><small>EMAIL US</small><strong>info@evx.one</strong></div></a>
              <div><span><EnvironmentOutlined /></span><div><small>SERVICE AREA</small><strong>Remote &amp; on-site support</strong></div></div>
            </div>
            <div className="response-note"><span /><p><b>Typical response: same business day</b>Send us a message and we&apos;ll get back to you as soon as possible.</p></div>
          </div>
          <div className="contact-form-panel">
            <div className="form-head"><span>NEW INQUIRY</span><i><b /> CONNECTION SECURE</i></div>
            <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
              <div className="form-row">
                <Form.Item name="name" label="Your name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input placeholder="Jane Smith" />
                </Form.Item>
                <Form.Item name="company" label="Company">
                  <Input placeholder="Company name" />
                </Form.Item>
              </div>
              <div className="form-row">
                <Form.Item name="email" label="Work email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                  <Input placeholder="jane@company.com" />
                </Form.Item>
                <Form.Item name="service" label="How can we help?">
                  <Select
                    placeholder="Select a service"
                    options={services.map((service) => ({ value: service.title, label: service.title }))}
                  />
                </Form.Item>
              </div>
              <Form.Item name="message" label="Tell us a little more" rules={[{ required: true, message: 'Please share a few details' }]}>
                <TextArea rows={5} placeholder="What challenge can we help you solve?" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send inquiry <SendOutlined />
              </Button>
              <p className="privacy-note"><LockOutlined /> Your information is kept private and never shared.</p>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-grid" />
      <div className="page-shell cta-inner">
        <div>
          <Eyebrow>Ready when you are</Eyebrow>
          <h2>Better IT starts with<br /><span>one conversation.</span></h2>
        </div>
        <div>
          <p>Tell us what&apos;s working, what isn&apos;t, and where you want to go. We&apos;ll help you build a clear path forward.</p>
          <RouterButton type="primary" size="large" to="/contact">Let&apos;s talk <ArrowRightOutlined /></RouterButton>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <Footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>Secure IT. Reliable networks.<br />Confidence built in.</p>
          <span className="footer-status"><i /> ALL SYSTEMS OPERATIONAL</span>
        </div>
        <div className="footer-links">
          <div><strong>Navigate</strong><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
          <div><strong>Services</strong><Link to="/services">IT Support</Link><Link to="/services">Network Deployments</Link><Link to="/services">Cybersecurity</Link><Link to="/services">Threat Monitoring</Link></div>
          <div><strong>Connect</strong><a href="mailto:info@evx.one">info@evx.one</a></div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} EVX One. All rights reserved.</span>
        <span>SECURE // RELIABLE // READY</span>
      </div>
    </Footer>
  )
}

function App() {
  return (
    <Layout className="app-shell">
      <ScrollToTop />
      <SiteHeader />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Content>
      <SiteFooter />
    </Layout>
  )
}

export default App

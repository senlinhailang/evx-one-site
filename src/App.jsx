import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import * as THREE from 'three'
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
        <Button className="desktop-cta" type="primary" href="/contact">
          Let&apos;s talk <ArrowRightOutlined />
        </Button>
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
        <Button block type="primary" href="/contact" onClick={() => setOpen(false)}>
          Let&apos;s talk <ArrowRightOutlined />
        </Button>
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

function ThreeGlobe({ threats }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 4.1)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const globe = new THREE.Group()
    globe.rotation.x = -0.16
    globe.rotation.z = -0.08
    scene.add(globe)

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshStandardMaterial({
        color: 0x09050f,
        emissive: 0x170727,
        emissiveIntensity: 0.5,
        metalness: 0.55,
        roughness: 0.48,
        transparent: true,
        opacity: 0.96,
      }),
    )
    globe.add(sphere)

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xb77af2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    })

    for (let latitude = -60; latitude <= 60; latitude += 20) {
      const phi = THREE.MathUtils.degToRad(latitude)
      const radius = Math.cos(phi)
      const y = Math.sin(phi)
      const points = Array.from({ length: 97 }, (_, index) => {
        const angle = (index / 96) * Math.PI * 2
        return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      })
      globe.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), gridMaterial))
    }

    for (let longitude = 0; longitude < 180; longitude += 20) {
      const lon = THREE.MathUtils.degToRad(longitude)
      const points = Array.from({ length: 97 }, (_, index) => {
        const angle = (index / 96) * Math.PI * 2
        return new THREE.Vector3(
          Math.sin(angle) * Math.cos(lon),
          Math.cos(angle),
          Math.sin(angle) * Math.sin(lon),
        )
      })
      globe.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), gridMaterial))
    }

    let threatMaterial
    if (threats.length > 1) {
      const toGlobePosition = ({ latitude, longitude }, radius = 1.025) => {
        const lat = THREE.MathUtils.degToRad(latitude)
        const lon = THREE.MathUtils.degToRad(longitude)
        return new THREE.Vector3(
          -radius * Math.cos(lat) * Math.cos(lon),
          radius * Math.sin(lat),
          radius * Math.cos(lat) * Math.sin(lon),
        )
      }

      threatMaterial = new THREE.LineDashedMaterial({
        color: 0xff4fd8,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        dashSize: 0.045,
        gapSize: 0.026,
      })

      threats.forEach((threat, index) => {
        const nextThreat = threats[(index + 1) % threats.length]
        const start = toGlobePosition(threat)
        const end = toGlobePosition(nextThreat)
        const distance = start.distanceTo(end)
        const midpoint = start.clone()
          .add(end)
          .normalize()
          .multiplyScalar(1.14 + distance * 0.18)
        const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end)
        const arc = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
          threatMaterial,
        )
        arc.computeLineDistances()
        globe.add(arc)
      })
    }

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.065, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x9c48e8,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    )
    globe.add(atmosphere)

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xb66ff0,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const orbitOne = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.004, 8, 160), orbitMaterial)
    orbitOne.rotation.x = 1.18
    orbitOne.rotation.y = 0.25
    scene.add(orbitOne)
    const orbitTwo = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.003, 8, 160), orbitMaterial.clone())
    orbitTwo.material.opacity = 0.12
    orbitTwo.rotation.x = 0.35
    orbitTwo.rotation.y = 0.82
    scene.add(orbitTwo)

    scene.add(new THREE.AmbientLight(0x8352a8, 1.8))
    const keyLight = new THREE.PointLight(0xd8b4fe, 8, 12)
    keyLight.position.set(-2.6, 2.4, 3.2)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0x6d28d9, 7, 10)
    rimLight.position.set(2.4, -1.2, -1.8)
    scene.add(rimLight)

    const resize = () => {
      const size = Math.max(1, Math.min(mount.clientWidth, mount.clientHeight))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    const animate = () => {
      if (!reduceMotion) {
        globe.rotation.y += 0.0027
        orbitOne.rotation.z += 0.0012
        orbitTwo.rotation.z -= 0.0008
        if (threatMaterial) {
          threatMaterial.dashOffset -= 0.003
          threatMaterial.opacity = 0.62 + Math.sin(performance.now() * 0.0025) * 0.12
        }
      }
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      mount.removeChild(renderer.domElement)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
    }
  }, [threats])

  return <div className="three-globe" ref={mountRef} aria-hidden="true" />
}

function SecurityVisual() {
  const [threats, setThreats] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const cacheKey = 'evx-dshield-threats-v1'
    const cacheLifetime = 60 * 60 * 1000

    const normalize = (records) => records
      .map((record) => ({
        latitude: Number(record.latitude ?? record.lat),
        longitude: Number(record.longitude ?? record.lng ?? record.lon),
      }))
      .filter(({ latitude, longitude }) => (
        Number.isFinite(latitude)
        && Number.isFinite(longitude)
        && latitude >= -90
        && latitude <= 90
        && longitude >= -180
        && longitude <= 180
      ))

    const loadThreats = async () => {
      try {
        const cached = JSON.parse(localStorage.getItem(cacheKey))
        if (cached?.timestamp && Date.now() - cached.timestamp < cacheLifetime && Array.isArray(cached.threats)) {
          setThreats(cached.threats)
          return
        }
      } catch {
        localStorage.removeItem(cacheKey)
      }

      const customEndpoint = import.meta.env.VITE_THREAT_ENDPOINT
      if (customEndpoint) {
        try {
          const response = await fetch(customEndpoint, { signal: controller.signal })
          if (!response.ok) throw new Error(`Custom feed returned ${response.status}`)
          const payload = await response.json()
          const customThreats = normalize(Array.isArray(payload) ? payload : payload.threats ?? [])
          if (customThreats.length) {
            setThreats(customThreats.slice(0, 250))
            return
          }
        } catch (error) {
          if (error.name === 'AbortError') return
          console.warn('Custom threat feed unavailable; using DShield:', error.message)
        }
      }

      const feedResponse = await fetch(
        'https://isc.sans.edu/api/topips/records/10?json',
        { signal: controller.signal },
      )
      if (!feedResponse.ok) throw new Error(`DShield returned ${feedResponse.status}`)
      const indicators = await feedResponse.json()
      if (!Array.isArray(indicators)) throw new Error('DShield returned an unexpected response')

      const locations = await Promise.allSettled(
        indicators.slice(0, 10).map(async ({ source }) => {
          const response = await fetch(`https://ipwho.is/${encodeURIComponent(source)}`, {
            signal: controller.signal,
          })
          if (!response.ok) throw new Error(`Geolocation returned ${response.status}`)
          const result = await response.json()
          if (!result.success) throw new Error(result.message ?? 'IP location unavailable')
          return { latitude: result.latitude, longitude: result.longitude }
        }),
      )
      const liveThreats = normalize(
        locations
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value),
      )

      setThreats(liveThreats)
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), threats: liveThreats }))
      } catch {
        // The visualization still works when storage is unavailable.
      }
    }

    loadThreats().catch((error) => {
      if (error.name !== 'AbortError') console.warn('DShield threat feed unavailable:', error.message)
    })

    return () => controller.abort()
  }, [])

  return (
    <div className="security-visual" aria-label="Spinning cyber security globe">
      <div className="globe-aura" />
      <ThreeGlobe threats={threats} />
      <div className="globe-lock"><SafetyCertificateOutlined /></div>
      <a
        className="threat-attribution"
        href="https://isc.sans.edu/"
        target="_blank"
        rel="noreferrer"
      >
        THREAT DATA: SANS ISC / DSHIELD
      </a>
    </div>
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
              <Button type="primary" size="large" href="/contact">
                Strengthen your IT <ArrowRightOutlined />
              </Button>
              <Button className="ghost-button" size="large" href="/services">
                Explore services
              </Button>
            </div>
            <div className="trust-row">
              <span><CheckCircleFilled /> Security-first</span>
              <span><CheckCircleFilled /> Rapid response</span>
              <span><CheckCircleFilled /> Human support</span>
            </div>
          </div>
          <SecurityVisual />
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
            <Button className="outline-button" size="large" href="/about">Why EVX One <ArrowRightOutlined /></Button>
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
              <Button className="outline-button" href="/contact">Start a conversation <ArrowRightOutlined /></Button>
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
          <Button type="primary" size="large" href="/contact">Let&apos;s talk <ArrowRightOutlined /></Button>
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

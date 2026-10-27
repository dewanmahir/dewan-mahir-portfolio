import { Code2, Database, Wrench } from 'lucide-react'
import { skills } from '../data/portfolioData.js'
import SectionHeading from './SectionHeading.jsx'

const categories = [
  { name: 'Frontend', icon: <Code2 size={18} />, note: 'The user-facing experience' },
  { name: 'Backend', icon: <Database size={18} />, note: 'Server-side fundamentals' },
  { name: 'Tools', icon: <Wrench size={18} />, note: 'Workflow and developer tools' },
]

export default function Skills() {
  return <section className="section" id="skills"><div className="container">
    <SectionHeading eyebrow="MY TOOLKIT" title={<>Skills I'm building <span className="gradient-text">with.</span></>} description="A practical snapshot of the technologies I use and the areas I'm actively improving." />
    <div className="skills-grid">{categories.map(cat => <article className="skill-group" key={cat.name}><div className="skill-group-head"><span className="skill-category-icon">{cat.icon}</span><div><h3>{cat.name}</h3><p>{cat.note}</p></div></div>
      <div className="skill-items">{skills.filter(skill => skill.category === cat.name).map(skill => <div className="skill-item" key={skill.name}><div className="skill-meta"><span>{skill.name}</span><small>{skill.label}</small></div><div className="skill-track"><span style={{ width: `${skill.level}%` }} /></div></div>)}</div>
    </article>)}</div>
    <p className="skill-note">Skill bars are self-assessments, not formal test scores. They can be adjusted in <code>src/data/portfolioData.js</code>.</p>
  </div></section>
}
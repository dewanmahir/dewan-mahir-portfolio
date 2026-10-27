import { ArrowUpRight, Heart, Lightbulb, Target } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const values = [
  {
    icon: <Lightbulb size={20} />,
    title: "Curious by nature",
    text: "I enjoy understanding how things work and turning new concepts into practical projects.",
  },
  {
    icon: <Target size={20} />,
    title: "Focused on growth",
    text: "I learn by building, asking questions, improving my code, and staying consistent.",
  },
  {
    icon: <Heart size={20} />,
    title: "People-first mindset",
    text: "I care about accessible, clear interfaces that feel simple and helpful to real people.",
  },
];

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container about-layout">
        <div>
          <SectionHeading
            eyebrow="A LITTLE ABOUT ME"
            title={
              <>
                The person behind{" "}
                <span className="gradient-text">the code.</span>
              </>
            }
          />
          <p className="body-copy">
            I'm Dewan Mahir, an Full-Stack Web Developer from Bangladesh. My
            journey started with the building blocks of the web: HTML and CSS.
            Since then, I've been strengthening my JavaScript and React skills
            while exploring backend development and Next.js.
          </p>
          <p className="body-copy">
            I enjoy creating responsive interfaces, organizing code into
            reusable components, and solving problems one step at a time.
            Outside programming, I like exploring technology, learning new
            things, and finding inspiration in good design. I'm still growing,
            and every project is a chance to get a little better.
          </p>
          <a className="text-link" href="#contact">
            Let's connect <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="values-list">
          {values.map((item, i) => (
            <article className="value-card" key={item.title}>
              <div className="value-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="value-number">0{i + 1}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

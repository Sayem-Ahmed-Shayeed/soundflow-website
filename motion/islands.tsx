// Motion Brew islands for the Soundflow page. Each reads its words from the static HTML it replaces,
// so the page reads in full without JavaScript and the copy lives in one place (index.html).
import "./islands.css";
import { createRoot } from "react-dom/client";
import { FlipWords } from "./components/flip-words";
import { AnnotationText } from "./components/annotation-text";
import { HighlightText } from "./components/highlight-text";
import { BlurAccordion } from "./components/blur-accordion";
import { BlurText } from "./components/blur-text";

const GREEN = "#034f46";
const mount = (sel: string, render: (el: HTMLElement) => React.ReactNode) =>
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    const node = render(el);
    el.dataset.mbReady = "";
    createRoot(el).render(node);
  });

// hero h1: the language flips between English and Bangla
mount("[data-mb=flip]", (el) => (
  <FlipWords
    before={el.dataset.before ?? ""}
    words={(el.dataset.words ?? "").split("|")}
    after=""
    interval={2600}
    className="m-0 [font:inherit] [letter-spacing:inherit]"
    wordClassName="text-[#034f46]"
  />
));

// "free and open source", underlined by hand when it comes into view
mount("[data-mb=annotate] [data-mark]", (el) => (
  <AnnotationText type="underline" color={GREEN} strokeWidth={2.2} delay={0.9} duration={0.8}>
    {el.textContent}
  </AnnotationText>
));

// the privacy statement: a marker sweeps behind the two promises
mount("[data-mb=highlight]", (el) => (
  <HighlightText
    text={el.textContent!.trim()}
    highlights={(el.dataset.highlights ?? "").split("|")}
    color="#cfe8dc"
    duration={0.7}
    className="m-0 max-w-none [font:inherit] [letter-spacing:inherit] text-inherit"
  />
));

// the questions: read from the static list, opened one at a time
mount("[data-mb=faq]", (el) => {
  const items = [...el.querySelectorAll<HTMLElement>(".faq__item")].map((it, i) => ({
    id: `q${i}`,
    title: it.querySelector("h3")!.textContent!,
    content: <span dangerouslySetInnerHTML={{ __html: it.querySelector("p")!.innerHTML }} />,
  }));
  return (
    <BlurAccordion
      items={items}
      blur={6}
      className="w-full rounded-[20px] border border-[#13201d]/12 bg-[#fffff7] p-2 shadow-none [&_button]:text-[17px] [&_button]:[font-family:var(--font-text)] [&_button]:text-[#13201d] [&_[role=region]>div]:text-[15px] [&_[role=region]>div]:text-[#4f574f]"
    />
  );
});

// the closing heading rises out of a blur, word by word
mount("[data-mb=blur]", (el) => (
  <BlurText as="span" text={el.textContent!.trim()} stagger={0.07} duration={0.8} blur={10} className="[font:inherit]" />
));

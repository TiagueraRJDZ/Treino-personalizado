/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    svg: React.SVGProps<SVGSVGElement>;
    circle: React.SVGProps<SVGCircleElement>;
  }
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
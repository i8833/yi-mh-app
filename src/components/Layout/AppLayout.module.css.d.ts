declare const styles: {
  readonly container: string;
  readonly main: string;
};

export default styles;

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
} 
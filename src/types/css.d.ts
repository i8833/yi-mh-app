declare module '*.module.css' {
  const styles: { readonly [key: string]: string };
  export default styles;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

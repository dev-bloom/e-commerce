import chroma from "chroma-js";

const generateColorVariations = (
  root: HTMLElement,
  name: string,
  color: string,
  mode: "brighten" | "darken"
) => {
  for (let i = 1; i <= 5; i++) {
    root.style.setProperty(
      `--${name}-${mode}-${i * 10}`,
      chroma(color)[mode](i).hex()
    );
  }
};

export const setColors = ({
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}) => {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", primaryColor);
  generateColorVariations(root, "primary-color", primaryColor, "brighten");
  generateColorVariations(root, "primary-color", primaryColor, "darken");
  root.style.setProperty("--secondary-color", secondaryColor);
  generateColorVariations(root, "secondary-color", secondaryColor, "brighten");
  generateColorVariations(root, "secondary-color", secondaryColor, "darken");
  root.style.setProperty("--tertiary-color", tertiaryColor);
  generateColorVariations(root, "tertiary-color", tertiaryColor, "brighten");
  generateColorVariations(root, "tertiary-color", tertiaryColor, "darken");
};

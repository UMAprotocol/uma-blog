import plugin from "tailwindcss/plugin";

// usage: "auto-fit-12" or with arbitrary value "auto-fit-[250px]"
export const autoFit = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      "auto-fill": (value) => ({
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
      }),
      "auto-fit": (value) => ({
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
      }),
    },
    {
      values: theme("width", {}),
    },
  );
});

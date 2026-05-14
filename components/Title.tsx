import localFont from "next/font/local"

const mondaFont = localFont({
  src: "../public/fonts/monda-font/monda.otf",
  display: "swap",
})

interface TitleProps {
  variant?: "white" | "black"
}

export default function Title({ variant = "white" }: TitleProps) {
  return (
    <div>
      <h1 className={`text-4xl font-semibold tracking-widest ${variant === "black" ? "text-black" : "text-white"} ${mondaFont.className}`}>
        smilo
      </h1>
    </div>
  );
}
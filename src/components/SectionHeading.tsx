import { joinClassNames } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={joinClassNames(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={joinClassNames(
            "mb-6 text-tiny font-medium uppercase tracking-[0.45em]",
            dark ? "text-white" : "text-black"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={joinClassNames(
          "font-serif text-heading-2 md:text-heading-1",
          dark ? "text-white" : "text-[#141414]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={joinClassNames(
            "mt-6 max-w-2xl text-body-lg font-light",
            dark ? "text-[#8a8a8a]" : "text-[#4a4a4a]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
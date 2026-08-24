import Image from "next/image";

type BrandLogoProps = {
  size?: "header" | "footer" | "auth" | "admin";
  onDark?: boolean;
  priority?: boolean;
};

export function BrandLogo({ size = "header", onDark = false, priority = false }: BrandLogoProps) {
  return <span className={`brand-logo brand-logo--${size}${onDark ? " brand-logo--on-dark" : ""}`}>
    <Image
      src="/brand/empire-consultants-logo.jpeg"
      alt="Empire Consultants Limited"
      width={1254}
      height={1254}
      priority={priority}
      sizes={size === "footer" || size === "auth" ? "160px" : "72px"}
    />
  </span>;
}

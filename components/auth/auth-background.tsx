interface AuthBackgroundProps {
  imageUrl: string
  brandName: string
}

export function AuthBackground({ imageUrl, brandName }: AuthBackgroundProps) {
  return (
    <>
      {/* Background Image - Desktop */}
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7) sepia(0.3) saturate(1.2)",
        }}
      />

      {/* Background Image - Mobile */}
      <div
        className="md:hidden h-[30vh] w-full relative z-0"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8) sepia(0.2)",
        }}
      >
        <div className="absolute top-8 left-8">
          <span className="text-white text-3xl font-bold tracking-tighter">
            {brandName}
          </span>
        </div>
      </div>
    </>
  )
}

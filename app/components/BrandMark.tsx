export function BrandLockup() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        {/* The asset is pre-sized; next/image adds avoidable client runtime in the global header under Vinext. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/zerobugg-mark.png" alt="" width={256} height={256} decoding="async" loading="eager" fetchPriority="high" />
      </span>
      <span className="wordmark">ZEROBUGG<span className="wordmark-dot">.</span></span>
    </>
  );
}

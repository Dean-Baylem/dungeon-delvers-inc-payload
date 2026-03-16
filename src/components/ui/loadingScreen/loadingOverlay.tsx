export default function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <span
      className={`absolute h-full w-full bg-[rgba(230,209,185,0.8)] top-0 left-0 ${isLoading ? 'opacity-100 pointer-events-auto animate-pulse' : 'opacity-0 pointer-events-none'}`}
    ></span>
  );
}

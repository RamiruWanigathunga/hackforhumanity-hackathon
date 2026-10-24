import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 bg-[#f3f3f3] text-[#141414] rounded-full mx-auto flex items-center justify-center font-bold text-xl">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#141414]">Page not found.</h1>
        <p className="text-sm text-[#707070]">
          The repair ticket or booking you are looking for does not exist or has expired.
        </p>
      </div>
      <div>
        <Button href="/" variant="primary">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

import { listProviders } from "@/server/db/queries";
import { setDemoProviderAction } from "@/server/actions/provider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";


export default async function ProviderPickerPage() {
  const providersList = await listProviders();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-6">
      <div className="space-y-2">
        <Badge variant="sample" size="sm">
          Presenter & Judge Demo Tool
        </Badge>
        <h1 className="heading-2 text-[#141414]">
          Demo provider identity switcher.
        </h1>
        <p className="subtitle-lead text-xs sm:text-sm">
          In this prototype, authentication is simplified for live judging. Select any fictional sample provider below to inspect their inbox and manage job requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {providersList.map((p) => {
          const categoryIcon = p.categories.includes("plumbing")
            ? "🚰"
            : p.categories.includes("electrical")
            ? "⚡"
            : "❄️";

          return (
            <form
              key={p.id}
              action={async () => {
                "use server";
                await setDemoProviderAction(p.id);
              }}
              className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-4 flex flex-col justify-between hover:border-[#141414] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#141414] text-white app-icon-squircle flex items-center justify-center text-base shrink-0">
                    {categoryIcon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#141414]">{p.displayName}</h3>
                    <span className="text-xs text-[#707070]">★ {p.rating} (demo) · {p.homeArea}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.categories.map((c) => (
                    <Badge key={c} variant="neutral" size="sm">
                      {c.replace(/_/g, " ")}
                    </Badge>
                  ))}
                  <Badge variant="neutral" size="sm">
                    {p.languages.map((l) => l.toUpperCase()).join("/")}
                  </Badge>
                </div>
                {p.bio && <p className="text-xs text-[#707070] line-clamp-2 pt-1">{p.bio}</p>}
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                Act as {p.displayName} →
              </Button>
            </form>
          );
        })}
      </div>
    </div>
  );
}

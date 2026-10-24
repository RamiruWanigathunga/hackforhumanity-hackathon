import { listProviders } from "@/server/db/queries";
import { setDemoProviderAction } from "@/server/actions/provider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ProviderPickerPage() {
  const providersList = await listProviders();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="space-y-1">
        <Badge variant="sample" size="sm">
          Presenter / Judge Demo Tool
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
          Demo Provider Identity Switcher
        </h1>
        <p className="text-xs sm:text-sm text-[#707070]">
          In this hackathon prototype, authentication is simplified. Select any fictional sample provider below to inspect their inbox and manage job requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {providersList.map((p) => (
          <form
            key={p.id}
            action={async () => {
              "use server";
              await setDemoProviderAction(p.id);
            }}
            className="bg-white rounded-2xl border border-[#f0f0f0] p-5 space-y-3 flex flex-col justify-between hover:border-[#141414] transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#141414]">{p.displayName}</h3>
                <span className="text-xs font-semibold text-[#141414]">★ {p.rating} (demo)</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.categories.map((c) => (
                  <Badge key={c} variant="neutral" size="sm">
                    {c.replace(/_/g, " ")}
                  </Badge>
                ))}
                <Badge variant="neutral" size="sm">
                  {p.homeArea}
                </Badge>
              </div>
              {p.bio && <p className="text-xs text-[#707070] line-clamp-2">{p.bio}</p>}
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full">
              Act as {p.displayName} →
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}

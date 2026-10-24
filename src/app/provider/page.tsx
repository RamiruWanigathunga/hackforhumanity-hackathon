import { listProviders } from "@/server/db/queries";
import { setDemoProviderAction } from "@/server/actions/provider";
import { Button } from "@/components/ui/Button";
import { PlumberIcon, ElectricianIcon, ACIcon } from "@/components/ui/Icons";

export default async function ProviderPickerPage() {
  const providersList = await listProviders();

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
          Presenter and Judge Demo Tool
        </span>
        <h1 className="display-md text-[#0a0b0d]">
          Demo provider identity switcher.
        </h1>
        <p className="body-md text-[#5b616e]">
          In this prototype, authentication is simplified for live judging. Select any fictional sample provider below to inspect their inbox and manage job requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {providersList.map((p) => {
          const IconComp = p.categories.includes("plumbing")
            ? PlumberIcon
            : p.categories.includes("electrical")
            ? ElectricianIcon
            : ACIcon;

          return (
            <form
              key={p.id}
              action={async () => {
                "use server";
                await setDemoProviderAction(p.id);
              }}
              className="coinbase-card bg-white rounded-[24px] border border-[#dee1e6] p-7 space-y-5 flex flex-col justify-between hover:border-[#0052ff] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#eef0f3] text-[#0a0b0d] flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-current" />
                  </div>
                  <div>
                    <h3 className="title-md text-[#0a0b0d]">{p.displayName}</h3>
                    <span className="text-xs text-[#7c828a]">Rating: {p.rating} (demo) / {p.homeArea}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-[#5b616e]">
                  {p.categories.map((c) => (
                    <span key={c} className="bg-[#f7f7f7] border border-[#dee1e6] px-2.5 py-0.5 rounded-full capitalize">
                      {c.replace(/_/g, " ")}
                    </span>
                  ))}
                  <span className="bg-[#f7f7f7] border border-[#dee1e6] px-2.5 py-0.5 rounded-full">
                    {p.languages.map((l) => l.toUpperCase()).join("/")}
                  </span>
                </div>
                {p.bio && <p className="body-sm text-[#5b616e] line-clamp-2">{p.bio}</p>}
              </div>

              <Button type="submit" variant="secondary" size="sm" className="w-full">
                Act as {p.displayName}
              </Button>
            </form>
          );
        })}
      </div>
    </div>
  );
}

import { listProviders } from "@/server/db/queries";
import { setDemoProviderAction } from "@/server/actions/provider";
import { Button } from "@/components/ui/Button";
import { PlumberIcon, ElectricianIcon, ACIcon } from "@/components/ui/Icons";

export default async function ProviderPickerPage() {
  const providersList = await listProviders();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-6">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
          Presenter and Judge Demo Tool
        </span>
        <h1 className="heading-2 text-[#141414]">
          Demo provider identity switcher.
        </h1>
        <p className="subtitle-lead text-xs sm:text-sm">
          In this prototype, authentication is simplified for live judging. Select any fictional sample provider below to inspect their inbox and manage job requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-4 flex flex-col justify-between hover:border-[#141414] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#141414] text-white app-icon-squircle flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#141414]">{p.displayName}</h3>
                    <span className="text-xs text-[#707070]">Rating: {p.rating} (demo) / {p.homeArea}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 text-xs text-[#707070]">
                  {p.categories.map((c) => (
                    <span key={c} className="bg-[#f5f5f5] px-2.5 py-0.5 rounded-full capitalize">
                      {c.replace(/_/g, " ")}
                    </span>
                  ))}
                  <span className="bg-[#f5f5f5] px-2.5 py-0.5 rounded-full">
                    {p.languages.map((l) => l.toUpperCase()).join("/")}
                  </span>
                </div>
                {p.bio && <p className="text-xs text-[#707070] line-clamp-2 pt-1">{p.bio}</p>}
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                Act as {p.displayName}
              </Button>
            </form>
          );
        })}
      </div>
    </div>
  );
}

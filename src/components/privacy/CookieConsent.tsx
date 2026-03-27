import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STORAGE_KEY = "inm.cookieConsent.v1";

type Consent = "accepted" | "declined";

export function getCookieConsent(): Consent | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "accepted" || raw === "declined") return raw;
  return null;
}

export function setCookieConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, consent);
}

function loadGoogleAnalytics(measurementId: string) {
  if (!measurementId) return;
  if (document.getElementById("ga-script")) return;

  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(s);

  const inline = document.createElement("script");
  inline.id = "ga-inline";
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const [consent, setConsent] = useState<Consent | null>(null);

  const gaId = useMemo(() => import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "", []);

  useEffect(() => {
    setConsent(getCookieConsent());
  }, []);

  useEffect(() => {
    if (consent === "accepted" && gaId) {
      loadGoogleAnalytics(gaId);
    }
  }, [consent, gaId]);

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <Card className="mx-auto max-w-3xl border-border bg-card/95 backdrop-blur-md shadow-lg">
        <div className="p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-medium text-foreground">{t("cookies.title")}</p>
            <p className="text-sm text-muted-foreground">{t("cookies.message")}</p>
          </div>
          <div className="flex gap-2 sm:shrink-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setCookieConsent("declined");
                setConsent("declined");
              }}
            >
              {t("cookies.decline")}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setCookieConsent("accepted");
                setConsent("accepted");
              }}
            >
              {t("cookies.accept")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


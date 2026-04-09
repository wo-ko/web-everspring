import { JobContent } from "@/types/jobcontent";

type JobEditorProps = {
  value: JobContent;
  onChange: (v: JobContent) => void;
  errors?: Record<string, string>;
};

export function JobEditor({ value, onChange, errors = {} }: JobEditorProps) {
  if (!value) return null;

  return (
    <div className="space-y-6 text-sm">
      {/* ================= ตำแหน่งงาน ================= */}
      <div className="space-y-2">
        <label className="font-medium">ชื่อตำแหน่ง</label>
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="TH"
          value={value.jobTitle.th}
          onChange={(e) =>
            onChange({
              ...value,
              jobTitle: { ...value.jobTitle, th: e.target.value },
            })
          }
        />
        {errors["jobTitle.th"] && (
          <p className="text-red-500 text-xs">{errors["jobTitle.th"]}</p>
        )}

        <input
          className="w-full border rounded px-2 py-1"
          placeholder="EN"
          value={value.jobTitle.en}
          onChange={(e) =>
            onChange({
              ...value,
              jobTitle: { ...value.jobTitle, en: e.target.value },
            })
          }
        />
        {errors["jobTitle.en"] && (
          <p className="text-red-500 text-xs">{errors["jobTitle.en"]}</p>
        )}
      </div>

      {/* ================= ประเภทงาน ================= */}
      <div className="space-y-2">
        <label className="font-medium">ประเภทงาน</label>
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="TH"
          value={value.jobType.th}
          onChange={(e) =>
            onChange({
              ...value,
              jobType: { ...value.jobType, th: e.target.value },
            })
          }
        />
        {errors["jobType.th"] && (
          <p className="text-red-500 text-xs">{errors["jobType.th"]}</p>
        )}

        <input
          className="w-full border rounded px-2 py-1"
          placeholder="EN"
          value={value.jobType.en}
          onChange={(e) =>
            onChange({
              ...value,
              jobType: { ...value.jobType, en: e.target.value },
            })
          }
        />
        {errors["jobType.en"] && (
          <p className="text-red-500 text-xs">{errors["jobType.en"]}</p>
        )}
      </div>

      {/* ================= จำนวนอัตรา ================= */}
      <div>
        <label className="font-medium">จำนวนอัตรา</label>
        <input
          type="number"
          className="w-32 border rounded px-2 py-1 ml-2"
          value={value.numberOfPositions}
          onChange={(e) =>
            onChange({
              ...value,
              numberOfPositions: Number(e.target.value),
            })
          }
        />
        {errors["numberOfPositions"] && (
          <p className="text-red-500 text-xs mt-1">
            {errors["numberOfPositions"]}
          </p>
        )}
      </div>

      {/* ================= สถานที่ ================= */}
      <div className="space-y-2">
        <label className="font-medium">สถานที่ทำงาน</label>

        <input
          className="w-full border rounded px-2 py-1"
          placeholder="จังหวัด (TH)"
          value={value.location.province.th}
          onChange={(e) =>
            onChange({
              ...value,
              location: {
                ...value.location,
                province: {
                  ...value.location.province,
                  th: e.target.value,
                },
              },
            })
          }
        />
        {errors["location.province.th"] && (
          <p className="text-red-500 text-xs">
            {errors["location.province.th"]}
          </p>
        )}

        <input
          className="w-full border rounded px-2 py-1"
          placeholder="จังหวัด (EN)"
          value={value.location.province.en}
          onChange={(e) =>
            onChange({
              ...value,
              location: {
                ...value.location,
                province: {
                  ...value.location.province,
                  en: e.target.value,
                },
              },
            })
          }
        />
        {errors["location.province.en"] && (
          <p className="text-red-500 text-xs">
            {errors["location.province.en"]}
          </p>
        )}
      </div>
    </div>
  );
}

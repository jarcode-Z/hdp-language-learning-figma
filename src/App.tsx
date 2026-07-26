import { useState } from "react";
import Library from "./components/Library";
import Import from "./components/Import";
import PracticeDesk from "./components/PracticeDesk";

type Page =
  | { name: "library" }
  | { name: "import" }
  | { name: "practice"; materialTitle: string };

export default function App() {
  const [page, setPage] = useState<Page>({ name: "library" });

  if (page.name === "library") {
    return (
      <Library
        onPractice={(_, title) => setPage({ name: "practice", materialTitle: title })}
        onImport={() => setPage({ name: "import" })}
      />
    );
  }

  if (page.name === "import") {
    return (
      <Import
        onBack={() => setPage({ name: "library" })}
        onComplete={(title) => setPage({ name: "practice", materialTitle: title })}
      />
    );
  }

  return (
    <PracticeDesk
      materialTitle={page.materialTitle}
      onBack={() => setPage({ name: "library" })}
    />
  );
}

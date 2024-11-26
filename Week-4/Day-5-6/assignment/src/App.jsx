import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import Topbar from "./components/Topbar";
import DATA from "./data.json";

export default function App() {
  const [data, setData] = useState(DATA);
  const [selectedTags, setSelectedTags] = useState([]);

  const addTags = (tag) => {
    const check = selectedTags.find((t) => t === tag);
    if (!check) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const filterData = () => {
    if (selectedTags.length <= 0) {
      setData(DATA);
      return;
    }

    const filteredJobs = DATA.filter((job) => {
      const tags = [job.role, job.level, ...job.languages, ...job.tools];

      return selectedTags.every((tag) => tags.includes(tag));
    });

    setData(filteredJobs);
  };

  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  useEffect(() => {
    filterData();
  }, [selectedTags]);

  return (
    <div className="flex flex-col gap-6">
      <Topbar tags={selectedTags} onClear={clearTags} onRemove={removeTag} />
      <main className="sm:w-4/5 w-[95%] mx-auto my-12 flex flex-col gap-6">
        <JobList onAdd={addTags} data={data} />
      </main>
    </div>
  );
}

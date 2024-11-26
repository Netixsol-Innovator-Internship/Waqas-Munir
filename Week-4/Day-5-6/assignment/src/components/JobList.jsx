/* eslint-disable no-unused-vars */

import Job from "./Job";

export default function JobList({ onAdd, data }) {
  return data.map((d) => <Job key={d.id} data={d} onAdd={onAdd} />);
}

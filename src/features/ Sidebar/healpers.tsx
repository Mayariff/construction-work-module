export function createLinksArr(): { name: string; link: string }[] {
  const res = []
  for (let i = 1; i < 15; i++) {
    if (i === 4) {
      res.push({ name: `СМР`, link: "/construction-table" })
    } else {
      res.push({ name: `some link ${i}`, link: "" })
    }
  }
  return res
}

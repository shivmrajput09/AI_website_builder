// AI kabhi-kabhi ```json fences ya extra text bhej deta hai.
// Isliye pehle "{" aur aakhri "}" ke beech ka hissa nikalke parse karte hain.
const extractJson = (text) => {
  if (!text) return null;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (error) {
    return null; // JSON toota hua hai
  }
};

export default extractJson;
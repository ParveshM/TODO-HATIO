import { TodoType } from "@/types";
import showToast from "@/utils/toaster";
import axios from "axios";

export default async function createGist(title: string, todos: TodoType[]) {
  try {
    const [pendingTodos, completedTodos] = getPendingAndCompletedTodos(todos);
    const filename = `${title}.md`;
    const gistData = `# ${title}
#### Summary: ${completedTodos.length}/${todos.length} todos completed
#### Pending
${pendingTodos.length ? pendingTodos.join("\n") : "None"}
#### Completed
${completedTodos.length ? completedTodos.join("\n") : "None"}
`;

    const { data } = await axios.post(
      "https://api.github.com/gists",
      {
        public: false,
        files: {
          [`${filename}`]: {
            content: gistData,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_AUTH_TOKEN}`,
        },
      }
    );
    return { url: data.html_url, gistData };
  } catch (error) {
    console.log(error);
    showToast("Something went wrong while exporting the file.", "error");
  }
}

function getPendingAndCompletedTodos(todos: TodoType[]): [string[], string[]] {
  return todos.reduce<[string[], string[]]>(
    (acc, curr) => {
      const [active, completed] = acc as string[][];
      curr.status === "active"
        ? active.push(`☐ ${curr.description}\n`)
        : completed.push(`☑ ${curr.description}\n`);
      return [active, completed];
    },
    [[], []]
  );
}

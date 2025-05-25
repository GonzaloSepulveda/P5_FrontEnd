import { Handlers, PageProps } from "$fresh/server.ts";
import Volver from "../components/Volver.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("telephone");

    const apiResponse = await fetch(
      "https://back-a-p4.onrender.com/contacts/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      },
    );

    const result = await apiResponse.json();

    if (apiResponse.status === 201) {
      return new Response("", {
        status: 303,
        headers: { Location: "/" },
      });
    } else {
      return ctx.render({ result });
    }
  },
};

const Page = ({ data }: PageProps<{ result?: unknown }>) => {
  return (
    <>
      <Volver />
      <div>
        <form method="POST">
          <input name="name" type="text" placeholder="Introduce nombre" />
          <input name="email" type="email" placeholder="Introduce email" />
          <input name="telephone" type="tel" placeholder="Introduce teléfono" />
          <button type="submit">Crear</button>
        </form>

        {data?.result && <pre>{JSON.stringify(data.result, null, 2)}</pre>}
      </div>
    </>
  );
};

export default Page;

import { useForm } from "react-hook-form";

function FreeText ({ module, setModule }) {
  const { register, handleSubmit } = useForm({ defaultValues: module.settings });

  function onSubmit(data) {
    console.log(data);
    setModule(module.id, data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="e.g. Hello world"
            name="text"
            ref={register}
          ></textarea>
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column">
          <button className="button is-primary" type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

export default FreeText;

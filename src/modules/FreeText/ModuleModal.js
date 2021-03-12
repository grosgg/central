import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

function ModuleModal({ module, space, onClose }) {
  const { register, handleSubmit } = useForm({ defaultValues: module });
  const { data: user } = useUser();
  const firestore = useFirestore();

  const moduleRef = firestore.collection('users').doc(user.uid)
    .collection('spaces').doc(space.id)
    .collection('modules').doc(module.id);

  function deleteModule() {
    moduleRef.delete();
    onClose();
  }

  function setModule(data) {
    moduleRef.set(
      { position: parseInt(data.position, 10) }, { merge: true }
    );
  }

  return(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">Free Text Settings</p>
          <form onSubmit={handleSubmit(setModule)}>
            <div className="field">
              <label className="label">Position</label>
              <div className="control">
                <input className="input" name="position" type="number" ref={register} />
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <button className="button is-primary" type="submit">Save</button>
              </div>
              <div className="column has-text-right">
                <button className="button is-danger" onClick={deleteModule}>Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => onClose()}
      ></button>
    </div>
  );
}

export default ModuleModal;

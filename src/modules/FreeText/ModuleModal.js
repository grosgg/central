import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

function ModuleModal({ module, spaceId, onClose }) {
  const { register, handleSubmit } = useForm({ defaultValues: module });
  const { data: user } = useUser();
  const firestore = useFirestore();

  const spaceRef = firestore.collection('users').doc(user.uid).collection('spaces').doc(spaceId);
  const moduleRef = spaceRef.collection('modules').doc(module.id);

  function deleteModule() {
    moduleRef.delete();
    onClose();
  }

  function setModule(data) {
    spaceRef.collection('modules').where("position", "==", data.position)
    .get().then(querySnapshot => {
      const batch = firestore.batch();
      querySnapshot.forEach(doc => {
        const docRef = spaceRef.collection('modules').doc(doc.id);
        batch.update(docRef, { position: module.position });
      });
      batch.update(moduleRef, { position: data.position });
      batch.commit().then(() => onClose());
    });
  }

  const positionOptions = [];
  for (let index = 0; index < 12; index++) {
    positionOptions.push(
      <option value={index} key={index}>{index}</option>
    )
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
                <div className="select">
                  <select name="position" ref={register({ valueAsNumber: true })}>
                    { positionOptions }
                  </select>
                </div>
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

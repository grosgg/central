import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

function NewModuleModal({ spaceId, newPosition, onClose }) {
  const { register, handleSubmit } = useForm();
  const { data: user } = useUser();
  const firestore = useFirestore();

  const spaceRef = firestore.collection('users').doc(user.uid)
    .collection('spaces').doc(spaceId);

  function addModule(data) {
    spaceRef.collection('modules').add(
      { type: data.type, position: newPosition }
    );
    onClose();
  }

  return(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">New Module</p>
          <form onSubmit={handleSubmit(addModule)}>
            <div className="field">
              <label className="label">Type</label>
              <div className="control">
                <div className="select">
                  <select name="type" ref={register}>
                    <option value="freetext">Free Text</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <button className="button is-primary" type="submit">Save</button>
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

export default NewModuleModal;

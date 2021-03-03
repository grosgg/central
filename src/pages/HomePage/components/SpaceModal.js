import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

function SpaceModal({ space, onClose }) {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const { register, handleSubmit } = useForm({ defaultValues: space });

  function onDelete() {
    firestore.collection('users').doc(user.uid).collection('spaces').doc(space.id).delete();
    onClose();
  }

  function onSubmit(data) {
    firestore.collection('users').doc(user.uid).collection('spaces').doc(space.id).set(
      { name: data.name }, { merge: true }
    );
    onClose();
  }

  return(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">{space.name}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" name="name" type="text" placeholder="e.g. Main, Work, Home" ref={register} />
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <button className="button is-primary" type="submit">Save</button>
              </div>
              <div className="column has-text-right">
                <button className="button is-danger" onClick={onDelete}>Delete</button>
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

export default SpaceModal;

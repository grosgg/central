import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

function ModuleModal({ module, spaceId, onReset, onClose }) {
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
      batch.update(moduleRef, data);
      batch.commit().then(() => {
        onReset();
        onClose();
      });
    });
  }

  function resetPomodoro() {
    onReset();
    onClose();
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
          <p className="title">Pomodoro Settings</p>
          <form onSubmit={handleSubmit(setModule)}>
            <div className="columns is-mobile">
              <div className="column">
                <div className="field">
                  <label className="label">Focus</label>
                  <div className="control">
                    <input name="focus" className="input" type="number" ref={register({ valueAsNumber: true })} />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Set</label>
                  <div className="control">
                    <input name="set" className="input" type="number" ref={register({ valueAsNumber: true })} />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <div className="field">
                  <label className="label">Short Break</label>
                  <div className="control">
                    <input name="shortBreak" className="input" type="number" ref={register({ valueAsNumber: true })} />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Long Break</label>
                  <div className="control">
                    <input name="longBreak" className="input" type="number" ref={register({ valueAsNumber: true })} />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
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
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <p className="buttons">
                  <button className="button is-primary" type="submit">Save</button>
                  <button className="button" onClick={resetPomodoro}>Reset</button>
                </p>
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

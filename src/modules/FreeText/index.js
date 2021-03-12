import { Fragment, useState } from 'react';
import {
  useUser,
  useFirestore,
} from 'reactfire';
import { useForm } from "react-hook-form";

import ModuleModal from './ModuleModal';

function FreeText ({ module, space }) {
  const { register, handleSubmit } = useForm({ defaultValues: module.settings });
  const { data: user } = useUser();
  const firestore = useFirestore();
  const [modal, setModal] = useState();

  function setModule(data) {
    firestore.collection('users').doc(user.uid)
      .collection('spaces').doc(space.id)
      .collection('modules').doc(module.id).set(
      data, { merge: true }
    );
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(setModule)}>
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
            <button className="button is-primary is-small" type="submit">Save</button>
          </div>
          <div className="column has-text-right">
            <button className="button is-small" onClick={() => setModal(module, space)}>Set</button>
          </div>
        </div>
      </form>
      { modal &&
        <ModuleModal
          module={module}
          space={space}
          onClose={() => setModal(null)}
        />
      }
    </Fragment>
  );
}

export default FreeText;

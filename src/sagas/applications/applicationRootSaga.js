import { postRangeKeySaga, deleteRangeKeySaga  } from './rangeConstrainsSagas.js'
import { deleteAllConfigKeysSaga, postConfigKeySaga, deleteConfigKeySaga  } from './configurationKeysSagas.js'
import { getApplicationDataSaga,getApplicationsSaga,postApplicationSaga,deleteApplicationSaga } from './applicationSagas.js'
import { postExclConsSaga, deleteExclConsSaga} from './exclusionConstraintsSaga.js'

/**
 * Root endpoint for all Async sagas this is used to provide all sagas to Middleware
 * TODO check if there are cleaner syntax for this. 
 */

export default function* () {
    yield[
        getApplicationDataSaga(),
        getApplicationsSaga(),
        postApplicationSaga(),
        deleteApplicationSaga(),
        deleteConfigKeySaga(),
        postConfigKeySaga(),
        deleteAllConfigKeysSaga(),
        postRangeKeySaga(),
        deleteRangeKeySaga(),
        postExclConsSaga(),
        deleteExclConsSaga()
      ]
}

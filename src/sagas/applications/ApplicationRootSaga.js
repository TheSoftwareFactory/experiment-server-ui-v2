import { postRangeKeySaga, deleteRangeKeySaga  } from './rangeConstrainsSagas.js'
import { deleteAllConfigKeysSaga, postConfigKeySaga, deleteConfigKeySaga  } from './configurationKeysSagas.js'
import { getApplicationDataSaga,getApplicationsSaga,postApplicationSaga,deleteApplicationSaga } from './applicationSagas.js'

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
      ]
}

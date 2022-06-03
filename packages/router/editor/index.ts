import {Router} from 'express';

import createFn from './create';
import deleteFn from './delete';

const router = Router();


router.post("",createFn);
router.delete("",deleteFn);


export default router;
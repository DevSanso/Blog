import {Router} from 'express';

import createFn from './create';
import readFn from './read';
import deleteFn from './delete';

const router = Router();


router.post("",createFn);
router.get("",readFn);
router.delete("",deleteFn);


export default router;
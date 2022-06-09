import {Router} from 'express';

import createFn from './create';
import deleteFn from './delete';

const router = Router();


router.post("",createFn);
router.delete("/:uuid",deleteFn);


export default router;
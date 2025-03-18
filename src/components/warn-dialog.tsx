import { useEffect, useState } from 'react';
import { TriangleAlert } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function DialogDataMessage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`
            flex items-center justify-center gap-x-2 text-center text-2xl
          `}
          >
            <TriangleAlert className="h-6 w-6 text-yellow-500" />
            注意
          </DialogTitle>
          <div className={`
            text-center text-base
            sm:text-l
          `}
          >
            <p className="">
              實際結果請依中央氣象署發布之內容為準
            </p>
            <p className="fond-bold">資料來源均為 TREM !!!</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function DialogInfoMessage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`
            flex items-center justify-center gap-x-2 text-center text-2xl
          `}
          >
            <TriangleAlert className="h-6 w-6 text-yellow-500" />
            注意
          </DialogTitle>
          <div className={`
            text-center text-base
            sm:text-l
          `}
          >
            <p>實際結果請依 中央氣象署 發布之內容為準</p>
            <p className="fond-bold">若未特別註記 資料來源均為 TREM</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

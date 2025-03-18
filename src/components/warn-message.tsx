import { useEffect, useState } from 'react';

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
          <DialogTitle className="text-2xl">注意</DialogTitle>
          <div className="text-l text-muted-foreground">
            <p>僅供參考，實際結果請依中央氣象署發布之內容為準</p>
            <p className="fond-bold">下方表格中資料來源均為 TREM !!!</p>
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
          <DialogTitle className="text-2xl">注意</DialogTitle>
          <div className="text-l text-muted-foreground">
            <p>僅供參考 實際結果請依 中央氣象署 發布之內容為準</p>
            <p className="fond-bold">下方表格中 若未特別註記 資料來源均為 TREM</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

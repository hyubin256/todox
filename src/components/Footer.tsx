
interface FooterProps {
  completedTaskCount: number;
  activeTaskCount: number;
}

export default function Footer({ completedTaskCount = 0, activeTaskCount = 0 }: FooterProps) {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {
              completedTaskCount > 0 && (
                <>
                  Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} việc.
                  {
                    activeTaskCount > 0 && `, còn ${activeTaskCount} việc chưa hoàn thành`
                  }
                </>
              )
            }

            {
              completedTaskCount === 0 && activeTaskCount > 0 && (
                <>
                  Bạn chưa hoàn thành bất kỳ việc gì.
                </>
              )
            }
          </p>
        </div>
      )}
    </>
  )
}
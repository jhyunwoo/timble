-- CreateTable
CREATE TABLE "studentgroup" (
    "id" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "entrance" INTEGER NOT NULL,

    CONSTRAINT "studentgroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentgroup" ADD CONSTRAINT "studentgroup_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

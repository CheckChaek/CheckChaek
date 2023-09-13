class PredictRequestModel {
  imageList: File[];

  constructor(props: File[]) {
    this.imageList = [...props];
  }

  public get ImageList(): File[] {
    return this.imageList;
  }

  public set setImageList(params: File[]) {
    this.imageList = [...params];
  }
}

export default PredictRequestModel;

import { DonationsBox } from './donationsBox'

//================== Scene origin ================== \\
const sceneSize = 16;
const origin = new Vector3(sceneSize / 2, 0, sceneSize / 2);

//================== Eiffel tower ================== \\
const eiffelTower = new Entity()
eiffelTower.addComponent(new Transform({ position: origin }))
eiffelTower.addComponent(new GLTFShape("models/eiffel_tower.gltf"))
engine.addEntity(eiffelTower);

//================== Bpi Plane ================== \\
const bpiPlane = new Entity()
bpiPlane.addComponent(new PlaneShape());

const planeMaterial = new Material()
const texture = new Texture("textures/logo_bpi.png");

planeMaterial.albedoTexture = texture
planeMaterial.alphaTexture = texture
planeMaterial.transparencyMode = 1

bpiPlane.addComponent(planeMaterial);

const pivot = new Entity();
pivot.addComponent(new Transform({ position: origin }))

engine.addEntity(pivot)
bpiPlane.setParent(pivot)

bpiPlane.addComponent(new Transform({ position: new Vector3(0, 1, 2), scale: new Vector3(2, -1, 0.1) }))

//================== Rotator System ================== \\
export class RotatorSystem implements ISystem {

  update(dt: number) {
    let transform = pivot.getComponent(Transform);
    transform.rotate(Vector3.Up(), -dt * 100)
  }
}
engine.addSystem(new RotatorSystem());



//================== NFT ================== \\
const nftEntity = new Entity()
const shapeComponent = new NFTShape(
  'ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/86902876787033016230246078766370946898281762830175324487219347329896807399425',
  { color: Color3.Blue(), style: PictureFrameStyle.Gold_Carved }
)
nftEntity.addComponent(shapeComponent)
nftEntity.addComponent(
  new Transform({
    position: origin.add(new Vector3(0, 1.5, 1)),
    rotation: new Quaternion(0, 180, 0, 1),
    scale: new Vector3(2, 2, 1),
  })
)
engine.addEntity(nftEntity)

//================== Donation box ================== \\

const box = new DonationsBox(
  { position: new Vector3(6.5, 0.98, 12), rotation: Quaternion.Euler(0, 0, 0) },
  '0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
  10
)

//================== Square table ================== \\

const transform32 = new Transform({
  position: new Vector3(6.5, 0, 12),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
const squareWoodTable = new Entity();
squareWoodTable.addComponentOrReplace(transform32)
const gltfShape19 = new GLTFShape('models/Table_03/Table_03.glb')
gltfShape19.withCollisions = true
gltfShape19.isPointerBlocker = true
gltfShape19.visible = true
squareWoodTable.addComponentOrReplace(gltfShape19)

engine.addEntity(squareWoodTable);



//================== Ground ================== \\

const groundEntity = new Entity('entity')
engine.addEntity(groundEntity)

const gltfShape = new GLTFShape(
  'models/FloorBaseGrass_01/FloorBaseGrass_01.glb'
)
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
groundEntity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundEntity.addComponentOrReplace(transform2)



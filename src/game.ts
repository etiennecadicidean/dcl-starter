
const sceneSize = 16;
const origin = new Vector3(sceneSize/2, 0, sceneSize/2);


const eiffelTower = new Entity()
eiffelTower.addComponent(new Transform({ position: origin}))
eiffelTower.addComponent(new GLTFShape("models/eiffel_tower.gltf"))

engine.addEntity(eiffelTower);


const bpiPlane = new Entity()
bpiPlane.addComponent(new PlaneShape());

const planeMaterial = new Material()

const texture = new Texture("textures/logo_bpi.png");

planeMaterial.albedoTexture = texture
planeMaterial.alphaTexture = texture
planeMaterial.transparencyMode = 1

bpiPlane.addComponent(planeMaterial);


const pivot = new Entity();
pivot.addComponent(new Transform({position: origin}))

engine.addEntity(pivot)
bpiPlane.setParent(pivot)

bpiPlane.addComponent(new Transform({ position: new Vector3(0, 1, 2), scale: new Vector3(2, -1, 0.1) }))

export class RotatorSystem implements ISystem {

  update(dt: number) {
    let transform = pivot.getComponent(Transform);
    transform.rotate(Vector3.Up(), -dt * 100)
  }  
}

engine.addSystem(new RotatorSystem());


const nftEntity = new Entity()

const shapeComponent = new NFTShape(
  'ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/86902876787033016230246078766370946898281762830175324487219347329896807399425',
  { color: Color3.Blue(), style: PictureFrameStyle.Gold_Carved }
)
nftEntity.addComponent(shapeComponent)
nftEntity.addComponent(
  new Transform({
    position: origin.add(new Vector3(0, 1.5, -1)), scale: new Vector3(2, 2, 1),
  })
)
engine.addEntity(nftEntity)


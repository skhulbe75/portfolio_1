// Backup
class Slingshot {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", this.resizeHandler.bind(this));
    window.addEventListener("scroll", this.addGift.bind(this));
  }

  init() {
    const self = this;

    this.canvas = document.querySelector(".slingshot");
    this.title = document.querySelector(".title");
    this.paths = this.title.querySelectorAll("path");

    // Create engine
    this.engine = Matter.Engine.create({
      enableSleeping: false,
    });
    this.world = this.engine.world;

    // Create render
    this.render = Matter.Render.create({
      element: document.body,
      engine: this.engine,
      canvas: this.canvas,
      options: {
        background: "tranparent",
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: false,
        showSleeping: false,
        wireframes: false,
      },
    });

    Matter.Render.run(this.render);

    // Create runner
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    // Add mouse control
    this.mouse = Matter.Mouse.create(this.render.canvas);
    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.Composite.add(this.world, this.mouseConstraint);
    this.render.mouse = this.mouse;
    this.mouseConstraint.collisionFilter.mask = 0x0004 | 0x0008;

    // Floor
    const bounding = this.title.getBoundingClientRect();
    const floor = Matter.Bodies.rectangle(
      bounding.left + 380,
      bounding.top + bounding.height + 5 + 10,
      bounding.width + 320,
      10,
      {
        isStatic: true,
        collisionFilter: {
          category: 0x0002,
        },
        render: {
          visible: false,
          fillStyle: "#000",
        },
      }
    );
    Matter.Composite.add(this.world, floor);

    // Add Letter
    this.addLetters();

    // Add Snow
    setInterval(this.addSnow.bind(this), Math.floor(Math.random() * 1000));

    // Add gift
    // this.addGift.bind(this);
  }

  resizeHandler() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addLetters() {
    this.paths.forEach((path) => {
      const letter = path.dataset.letter;
      const bounding = path.getBoundingClientRect();

      const rectangle = Matter.Bodies.rectangle(
        bounding.left + 110,
        bounding.top - 600,
        bounding.width + 20,
        bounding.height + 50,
        {
          isSleeping: false,
          collisionFilter: {
            category: 0x0004,
          },
          render: {
            sprite: {
              texture: "./svg/letter-" + letter + ".svg",
              xScale: 1.5,
              yScale: 1.5,
            },
          },
        }
      );

      Matter.Composite.add(this.world, rectangle);
    });
  }

  addSnow() {
    var boxA1 = Matter.Bodies.circle(
      Math.floor(Math.random() * this.canvas.width),
      20,
      2,
      {
        render: {
          fillStyle: "#fff",
        },
        frictionAir: 0.3,
      }
    );
    var boxB1 = Matter.Bodies.circle(
      Math.floor(Math.random() * this.canvas.width),
      20,
      5,
      {
        render: {
          fillStyle: "#fff",
        },
        frictionAir: 0.6,
      }
    );
    var boxC1 = Matter.Bodies.circle(
      Math.floor(Math.random() * this.canvas.width),
      20,
      4,
      {
        render: {
          fillStyle: "#fff",
        },
        frictionAir: 0.2,
      }
    );
    Matter.Composite.add(this.world, [boxA1, boxB1, boxC1]);
  }

  addGift() {
    var rect = Matter.Bodies.rectangle(400, 0, 100, 80, {
      render: {
        fillStyle: "#fff",
      },
    });
    let height = window.innerHeight;
    const y = window.scrollY;
    let gift = false;
    if (y > height) {
      something();
    }
    var something = (function () {
      var executed = false;
      return function () {
        if (!executed) {
          executed = true;
          Matter.Composite.add(this.world, rect);
        }
      };
    })();
  }
}

const slingshot = new Slingshot();
slingshot.init();
